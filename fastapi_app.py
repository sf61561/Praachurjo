from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
import mysql.connector
from datetime import datetime
from sentiment_analyzer import SentimentAnalyzer
import numpy as np

# Initialize FastAPI app
app = FastAPI(
    title="Product Review Sentiment Analysis API",
    description="API for analyzing sentiment of product reviews using TF-IDF",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize sentiment analyzer with BOTH model and vectorizer files
sentiment_analyzer = SentimentAnalyzer(
    model_path='sentiment_model.pkl',
    vectorizer_path='tfidf_vectorizer.pkl'
)

def convert_numpy_types(value):
    """Convert numpy types to Python native types"""
    if isinstance(value, (np.integer, np.int64, np.int32)):
        return int(value)
    elif isinstance(value, (np.floating, np.float64, np.float32)):
        return float(value)
    elif isinstance(value, np.ndarray):
        return value.tolist()
    elif hasattr(value, 'item'):  # numpy scalar
        return value.item()
    return value

def get_db_connection():
    """Create and return database connection"""
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="jkkniu-mart"
        )
        return connection
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        raise HTTPException(status_code=500, detail="Database connection failed")

# Pydantic models
class ReviewInput(BaseModel):
    product_id: int = Field(..., description="Product ID")
    reviewer: str = Field(..., min_length=1, max_length=100, description="Reviewer name")
    review_description: str = Field(..., min_length=5, max_length=1000, description="Review text")
    
class ReviewResponse(BaseModel):
    success: bool
    message: str
    review_id: Optional[int] = None
    sentiment_analysis: dict

class SentimentAnalysisRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Text to analyze")

# API Endpoints
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Product Review Sentiment Analysis API with TF-IDF",
        "version": "1.0.0",
        "status": "running",
        "model_info": {
            "model": type(sentiment_analyzer.model).__name__ if sentiment_analyzer.model else "Not loaded",
            "vectorizer": type(sentiment_analyzer.vectorizer).__name__ if sentiment_analyzer.vectorizer else "Not loaded",
            "vocabulary_size": len(sentiment_analyzer.vectorizer.vocabulary_) if sentiment_analyzer.vectorizer else 0
        },
        "endpoints": {
            "analyze": "/api/analyze-sentiment",
            "review": "/api/reviews/add",
            "get_reviews": "/api/reviews/{product_id}",
            "health": "/health"
        }
    }

@app.post("/api/analyze-sentiment")
async def analyze_sentiment(request: SentimentAnalysisRequest):
    """Analyze sentiment of given text using TF-IDF"""
    try:
        result = sentiment_analyzer.analyze_sentiment(request.text)
        return {
            "success": True,
            "text": request.text,
            "analysis": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sentiment analysis failed: {str(e)}")

@app.post("/api/reviews/add", response_model=ReviewResponse)
async def add_review(review: ReviewInput):
    """Add a new product review with automatic sentiment analysis"""
    try:
        # Analyze sentiment using TF-IDF
        sentiment_result = sentiment_analyzer.analyze_sentiment(review.review_description)
        
        # Get database connection
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Insert review with sentiment data
        insert_query = """
            INSERT INTO reviews 
            (product_id, reviewer, review_description, number_of_star, date, 
             sentiment, confidence, sentiment_color, text_color)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        current_date = datetime.now().strftime('%Y-%m-%d')
        
        # Convert numpy types to Python native types
        values = (
            int(review.product_id),
            str(review.reviewer),
            str(review.review_description),
            convert_numpy_types(sentiment_result['rating']),
            current_date,
            str(sentiment_result['sentiment']),
            convert_numpy_types(sentiment_result['confidence']),
            str(sentiment_result['color']),
            str(sentiment_result['text_color'])
        )
        
        cursor.execute(insert_query, values)
        conn.commit()
        
        review_id = cursor.lastrowid
        
        cursor.close()
        conn.close()
        
        return ReviewResponse(
            success=True,
            message="Review added successfully with TF-IDF sentiment analysis",
            review_id=review_id,
            sentiment_analysis=sentiment_result
        )
        
    except mysql.connector.Error as db_error:
        raise HTTPException(status_code=500, detail=f"Database error: {str(db_error)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding review: {str(e)}")

@app.get("/api/reviews/{product_id}")
async def get_reviews(product_id: int):
    """Get all reviews for a specific product with sentiment data"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        query = """
            SELECT id, product_id, reviewer, review_description, 
                   number_of_star, date, sentiment, confidence, 
                   sentiment_color, text_color
            FROM reviews 
            WHERE product_id = %s
            ORDER BY date DESC
        """
        
        cursor.execute(query, (product_id,))
        reviews = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        if not reviews:
            return {
                "success": True,
                "message": "No reviews found for this product",
                "reviews": []
            }
        
        return {
            "success": True,
            "message": f"Found {len(reviews)} reviews",
            "count": len(reviews),
            "reviews": reviews
        }
        
    except mysql.connector.Error as db_error:
        raise HTTPException(status_code=500, detail=f"Database error: {str(db_error)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching reviews: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": sentiment_analyzer.model is not None,
        "vectorizer_loaded": sentiment_analyzer.vectorizer is not None,
        "vectorizer_info": {
            "type": type(sentiment_analyzer.vectorizer).__name__ if sentiment_analyzer.vectorizer else None,
            "vocabulary_size": len(sentiment_analyzer.vectorizer.vocabulary_) if sentiment_analyzer.vectorizer else 0
        },
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
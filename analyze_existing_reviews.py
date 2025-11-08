import mysql.connector
import sys
import os
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
from sentiment_analyzer import SentimentAnalyzer

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
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="jkkniu-mart"
    )

def analyze_all_reviews():
    print("\n" + "="*70)
    print("RE-ANALYZING ALL REVIEWS (POSITIVE/NEGATIVE ONLY)")
    print("="*70 + "\n")
    
    try:
        analyzer = SentimentAnalyzer('sentiment_model.pkl', 'tfidf_vectorizer.pkl')
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT id, review_description FROM reviews")
        reviews = cursor.fetchall()
        
        print(f"Found {len(reviews)} reviews to analyze\n")
        
        for review in reviews:
            sentiment_result = analyzer.analyze_sentiment(review['review_description'])
            
            update_query = """
                UPDATE reviews 
                SET sentiment = %s,
                    confidence = %s,
                    number_of_star = %s,
                    sentiment_color = %s,
                    text_color = %s
                WHERE id = %s
            """
            
            cursor.execute(update_query, (
                str(sentiment_result['sentiment']),
                convert_numpy_types(sentiment_result['confidence']),
                convert_numpy_types(sentiment_result['rating']),
                str(sentiment_result['color']),
                str(sentiment_result['text_color']),
                int(review['id'])
            ))
            conn.commit()
            
            print(f"✅ Review {review['id']}: {sentiment_result['sentiment'].upper()} ({sentiment_result['confidence']:.1f}%)")
        
        cursor.close()
        conn.close()
        print(f"\n✅ Successfully updated {len(reviews)} reviews\n")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    analyze_all_reviews()
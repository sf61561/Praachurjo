import mysql.connector
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))
from sentiment_analyzer import SentimentAnalyzer

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Tuhin@2025",
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
                sentiment_result['sentiment'],
                sentiment_result['confidence'],
                sentiment_result['rating'],
                sentiment_result['color'],
                sentiment_result['text_color'],
                review['id']
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
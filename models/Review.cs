namespace BookReviewAPI.Models
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    public class Review
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } // Made nullable to bypass validation errors
public string AuthorName { get; set; }
  public string Genre { get; set; }        // ✅ ADD THIS
    public string Language { get; set; }  
        public string BookName { get; set; }
        public string UserName { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
         public DateTime CreatedAt { get; set; }
    }
}
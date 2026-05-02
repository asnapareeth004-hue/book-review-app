using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;
using BookReviewAPI.Models; // <-- Add this line to fix the error!

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ReviewController : ControllerBase
{
    private readonly IMongoCollection<Review> _reviews;

    public ReviewController(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDbSettings:ConnectionString"]);
        var database = client.GetDatabase(config["MongoDbSettings:DatabaseName"]);
        _reviews = database.GetCollection<Review>(config["MongoDbSettings:CollectionName"]);
    }

    [HttpGet]
    public async Task<ActionResult<List<Review>>> Get()
    {
        var reviews = await _reviews.Find(_ => true).ToListAsync();
        return Ok(reviews);
    }

    [HttpPost]
    public async Task<ActionResult<Review>> Create(Review review)
    {
        if (string.IsNullOrEmpty(review.Id))
        {
            review.Id = ObjectId.GenerateNewId().ToString();
        }

        await _reviews.InsertOneAsync(review);
        return CreatedAtAction(nameof(Get), new { id = review.Id }, review);
    }

[HttpDelete("{id}")]
public async Task<IActionResult> Delete(string id)
{
    if (!ObjectId.TryParse(id, out var objId))
        return BadRequest("Invalid ID");

    var result = await _reviews.DeleteOneAsync(
        Builders<Review>.Filter.Eq("_id", objId)
    );

    return result.DeletedCount > 0 ? Ok() : NotFound();
}}
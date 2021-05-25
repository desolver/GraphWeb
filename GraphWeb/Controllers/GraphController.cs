using GraphWeb.Models;
using Microsoft.AspNetCore.Mvc;

namespace GraphWeb.Controllers
{
    [ApiController]
    [Route("graph")]
    public class GraphController
    {
        [HttpGet]
        [Route("state")]
        public GraphDto GetNextGraphState()
        {
            return new GraphDto { Nodes = Graph.Nodes };
        }
    }
}
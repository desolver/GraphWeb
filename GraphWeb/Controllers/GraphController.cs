using GraphWeb.Models;
using Microsoft.AspNetCore.Mvc;

namespace GraphWeb.Controllers
{
    [ApiController]
    [Route("graph")]
    public class GraphController
    {
        private readonly Graph _graph;

        public GraphController(Graph graph)
        {
            _graph = graph;
        }
        
        [HttpGet]
        [Route("state")]
        public GraphDto GetNextGraphState()
        {
            var nodes = _graph.NextIteration();

            return new GraphDto
            {
                Nodes = nodes,
                ElapsedTime = _graph.ElapsedTime,
                DefectiveNodeCount = _graph.DefectiveNodeCount,
                ServiceNodeCount = _graph.ServiceNodeCount,
                WorkingNodeCount = _graph.WorkingNodeCount,
                ResourceCount = _graph.ResourceCount
            };
        }
    }
}
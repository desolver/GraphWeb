using GraphWeb.Models;
using Microsoft.AspNetCore.Mvc;

namespace GraphWeb.Controllers
{
    [ApiController]
    [Route("config")]
    public class ConfigurationController
    {
        private readonly Graph _graph;

        public ConfigurationController(Graph graph)
        {
            _graph = graph;
        }
        
        [Route("new")]
        [HttpPost]
        public void ConfigureGraph([FromBody] ConfigurationDto config)
        {
            _graph.ConfigureNewGraph(config);
        }
    }
}
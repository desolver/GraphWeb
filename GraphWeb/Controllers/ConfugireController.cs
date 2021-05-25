using GraphWeb.Models;
using Microsoft.AspNetCore.Mvc;

namespace GraphWeb.Controllers
{
    [ApiController]
    [Route("config")]
    public class ConfigurationController
    {
        [Route("new")]
        [HttpPost]
        public void ConfigureGraph([FromBody] ConfigurationDto config)
        {
            Graph.ConfigureNewGraph(config);
        }
    }
}
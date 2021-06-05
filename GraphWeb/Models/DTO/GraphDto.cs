namespace GraphWeb.Models
{
    public class GraphDto
    {
        public Node[] Nodes { get; set; }
        public int ElapsedTime { get; set; }
        public int WorkingNodeCount { get; set; }
        public int ServiceNodeCount { get; set; }
        public int DefectiveNodeCount { get; set; }
        public int ResourceCount { get; set; }
    }
}
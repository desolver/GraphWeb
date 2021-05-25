namespace GraphWeb.Models
{
    public class ConfigurationDto
    {
        public int NodeCount { get; set; }
        
        public int WorkingNodeCount { get; set; }
        public int ServiceNodeCount { get; set; }
        public int DefectiveNodeCount { get; set; }
        
        public double WorkingTimeMilliseconds { get; set; }
        public double ServiceTimeMilliseconds { get; set; }
        public double RepairTimeMilliseconds { get; set; }
        public int ResourceCount { get; set; }
        public int ServicePrice { get; set; }
    }
}
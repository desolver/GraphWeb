using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphWeb.Models
{
    public class Graph
    {
        public Node[] Nodes { get; set; }

        public int ElapsedTime { get; set; }

        public int WorkingNodeCount => Nodes.Count(n => n.State == NodeState.Working);
        public int ServiceNodeCount => Nodes.Count(n => n.State == NodeState.Service);
        public int DefectiveNodeCount => Nodes.Count(n => n.State == NodeState.Defective);
        public int ResourceCount => Nodes.Sum(n => n.ResourceCount);
        
        public void ConfigureNewGraph(ConfigurationDto config)
        {
            Nodes = new Node[config.NodeCount];
            ElapsedTime = 0;
            
            var workingNodeIndex = config.WorkingNodeCount;
            var serviceNodeIndex = config.WorkingNodeCount + config.ServiceNodeCount;
            var defectiveNodeIndex = config.WorkingNodeCount + config.ServiceNodeCount + config.DefectiveNodeCount;
            
            if (defectiveNodeIndex != config.NodeCount)
                throw new ArgumentException("Количество вершин не совпадает!");
            
            for (int i = 0; i < workingNodeIndex; i++)
                Nodes[i] = new Node(NodeState.Working, config.WorkingTimeMilliseconds,
                    config.ServiceTimeMilliseconds, config.RepairTimeMilliseconds,
                    config.ResourceCount, config.ServicePrice);

            for (int i = workingNodeIndex; i < serviceNodeIndex; i++)
                Nodes[i] = new Node(NodeState.Service, config.WorkingTimeMilliseconds,
                    config.ServiceTimeMilliseconds, config.RepairTimeMilliseconds,
                    config.ResourceCount, config.ServicePrice);

            for (int i = serviceNodeIndex; i < defectiveNodeIndex; i++)
                Nodes[i] = new Node(NodeState.Defective, config.WorkingTimeMilliseconds,
                    config.ServiceTimeMilliseconds, config.RepairTimeMilliseconds,
                    config.ResourceCount, config.ServicePrice);
        }

        public Node[] NextIteration()
        {
            ElapsedTime++;
            foreach (var node in Nodes)
            {
                node.NextIteration();
            }

            return Nodes;
        }
    }
}
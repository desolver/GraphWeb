using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphWeb.Models
{
    public class Graph
    {
        // public static float FailureProbability
        // {
        //     get
        //     {
        //         var probability = Nodes.Aggregate(1f, (current, node) => current * node.FailureProbability);
        //         return probability;
        //     }
        // }

        public static Node[] Nodes;
        private readonly TaskFactory _taskFactory;

        public Graph(Node[] nodes)
        {
            Nodes = nodes;
            _taskFactory = new TaskFactory();
        }

        public static void ConfigureNewGraph(ConfigurationDto config)
        {
            Nodes = new Node[config.NodeCount];

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

        public IEnumerable<Node> GetNodes() => Nodes;
    }
}
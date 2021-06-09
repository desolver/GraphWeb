using System;

namespace GraphWeb.Models
{
    public class Node
    {
        public int Id { get; }
        public NodeState State { get; private set; }

        public int ElapsedTime { get; private set; }
        
        public int ResourceCount { get; private set; }
        
        private static int _id;
        private readonly Random _random;

        private readonly int _servicePrice;
        
        private readonly double _workingTime;
        private readonly double _serviceTime;
        private readonly double _repairTime;

        private readonly double LambdaTo;
        private readonly double LambdaTg;
        
        public Node(NodeState state, double workingTime, double serviceTime, double repairTime, 
            int resourceCount, int servicePrice)
        {
            State = state;
            Id = _id++;
            _random = new Random(Id);

            _workingTime = workingTime;
            _serviceTime = serviceTime;
            _repairTime = repairTime;
            ResourceCount = resourceCount;
            _servicePrice = servicePrice;
            
            LambdaTo = - Math.Log(0.01) / _serviceTime;
            LambdaTg = -Math.Log(0.99) / _workingTime;
        }

        public void NextIteration()
        {
            ElapsedTime++;
            if (ResourceCount <= 0 && State != NodeState.Working)
            {
                Console.WriteLine($"Нода {Id}: РЕСУРСА НЕ ХВАТАЕТ");
                return;
            }
            
            switch (State)
            {
                case NodeState.Working:
                    ProcessWorkingState();
                    break;
                case NodeState.Service:
                    ProcessServiceState();
                    break;
                case NodeState.Defective:
                    ProcessDefectiveState();
                    break;
            }
        }

        private void ProcessWorkingState()
        {
            Console.WriteLine($"Нода {Id}: В СОСТОЯНИИ РАБОТЫ");

            if (ElapsedTime >= _workingTime) 
                TransitState(NodeState.Service);

            var p = 1 - Math.Exp(-LambdaTg * ElapsedTime);

            if (_random.NextDouble() <= p) 
                TransitState(NodeState.Defective);
        }

        private void ProcessServiceState()
        {            
            Console.WriteLine($"Нода {Id}: В СОСТОЯНИИ ОБСЛУЖИВАНИЯ");

            if (ElapsedTime >= _serviceTime)
                if (TrySpendResource())
                    TransitState(NodeState.Working);
                else return;

            var p = (1 - Math.Exp(-LambdaTo * ElapsedTime));

            if (_random.NextDouble() <= p) 
                TransitState(NodeState.Defective);
        }
        
        private void ProcessDefectiveState()
        {
            Console.WriteLine($"Нода {Id}: В СОСТОЯНИИ НЕИСПРАВНОСТИ");

            if (ElapsedTime >= _repairTime)
                if (TrySpendResource())
                    TransitState(NodeState.Working);
        }

        private bool TrySpendResource()
        {
            if (_servicePrice > ResourceCount)
                return false;

            ResourceCount -= _servicePrice;
            return true;
        }

        private void TransitState(NodeState newState)
        {
            ElapsedTime = 0;
            
            switch (newState)
            {
                case NodeState.Working:
                    State = NodeState.Working;
                    break;
                case NodeState.Service:
                    State = NodeState.Service;
                    break;
                case NodeState.Defective:
                    State = NodeState.Defective;
                    break;
            }
        }
    }
}
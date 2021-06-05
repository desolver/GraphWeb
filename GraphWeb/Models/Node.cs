using System;

namespace GraphWeb.Models
{
    public class Node
    {
        public int Id { get; }
        public NodeState State { get; private set; }
        //public float FailureProbability { get; private set; }

        private static int _id;

        private readonly Random _random;
        private readonly NodeTimer _timer;
        private const double Interval = 1000d;

        private int _resourceCount = 100;
        private readonly int _servicePrice = 1;
        
        private readonly double _workingTime = 3000d;
        private readonly double _serviceTime = 4000d;
        private readonly double _repairTime = 5000d;

        private readonly double LambdaTo;
        private readonly double LambdaTg;
        
        public Node(NodeState state, double workingTime, double serviceTime, double repairTime, 
            int resourceCount, int servicePrice)
        {
            State = state;
            Id = _id++;
            _timer = new NodeTimer(Interval, DoWork);
            _random = new Random(Id);

            _workingTime = workingTime;
            _serviceTime = serviceTime;
            _repairTime = repairTime;
            _resourceCount = resourceCount;
            _servicePrice = servicePrice;
            
            LambdaTo = - Math.Log(0.01) / _serviceTime;
            LambdaTg = -Math.Log(0.99) / _workingTime;
        }

        private void DoWork()
        {
            if (_resourceCount <= 0 && State != NodeState.Working)
            {
                _timer.Stop();
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

            if (_timer.ElapsedTime >= _workingTime) 
                TransitState(NodeState.Service);

            var p = 1 - Math.Exp(-LambdaTg * _timer.ElapsedTime);

            if (_random.NextDouble() <= p) 
                TransitState(NodeState.Defective);
        }

        private void ProcessServiceState()
        {            
            Console.WriteLine($"Нода {Id}: В СОСТОЯНИИ ОБСЛУЖИВАНИЯ");

            if (_timer.ElapsedTime >= _serviceTime)
                if (TrySpendResource())
                    TransitState(NodeState.Working);
                else return;

            var p = (1 - Math.Exp(-LambdaTo * _timer.ElapsedTime));

            if (_random.NextDouble() <= p) 
                TransitState(NodeState.Defective);
        }
        
        private void ProcessDefectiveState()
        {
            Console.WriteLine($"Нода {Id}: В СОСТОЯНИИ НЕИСПРАВНОСТИ");

            if (_timer.ElapsedTime >= _repairTime)
                if (TrySpendResource())
                    TransitState(NodeState.Working);
                else return;
        }

        private bool TrySpendResource()
        {
            if (_servicePrice > _resourceCount)
                return false;

            _resourceCount -= _servicePrice;
            return true;
        }

        private void TransitState(NodeState newState)
        {
            _timer.Restart();
            
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
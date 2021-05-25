using System;
using System.Timers;

namespace GraphWeb.Models
{
    public class NodeTimer
    {
        public double ElapsedTime { get; private set; }

        private Timer _timer;
        private readonly double _interval;
        private readonly Action _tickAction;
        
        public NodeTimer(double interval, Action tickAction)
        {
            _interval = interval;
            _tickAction = tickAction;

            InitializeNewTimer();
        }

        public void Restart()
        {
            _timer.Stop();
            _timer.Dispose();
            
            InitializeNewTimer();
        }

        private void InitializeNewTimer()
        {
            _timer = new Timer(_interval);
            _timer.Elapsed += (sender, args) => _tickAction();
            _timer.Elapsed += (sender, args) => OnElapsed();
            ElapsedTime = 0;
            _timer.Start();
        }

        private void OnElapsed() => ElapsedTime += _interval;

        public void Stop()
        {
            _timer.Stop();
            _timer.Dispose();
        }
    }
}
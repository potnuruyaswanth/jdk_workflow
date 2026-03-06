import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Code2, Info } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/visualizer', label: 'Visualizer', icon: Code2 },
  ];

  return (
    <nav className="bg-jvm-dark border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-jvm-accent to-purple-600 rounded flex items-center justify-center">
                <Code2 size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl text-white">JVM Insight</span>
            </div>
            
            <div className="flex gap-1 ml-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                      isActive
                        ? 'bg-jvm-accent text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://docs.oracle.com/javase/specs/jvms/se17/html/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-jvm-accent transition-colors text-sm"
            >
              <Info size={16} />
              <span>JVM Spec</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

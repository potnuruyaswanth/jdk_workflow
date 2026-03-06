import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-darker border-t border-primary/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-primary font-bold mb-4">About</h3>
            <p className="text-slate-400 text-sm">
              Java Execution Visualizer helps students understand how Java programs execute internally through interactive visualization.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-primary font-bold mb-4">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-primary transition">JDK Documentation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition">JRE Overview</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition">JVM Internals</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-primary font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary transition"><Github size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-primary transition"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-primary transition"><Mail size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-4 text-center text-slate-500 text-sm">
          <p>&copy; 2024 Java Execution Visualizer. Built with React, Vite, and TailwindCSS.</p>
        </div>
      </div>
    </footer>
  );
}

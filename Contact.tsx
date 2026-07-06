
import { useState } from 'react';
import { Mail } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const teamMembers = [
  {
    name: "Sandeep Narlapuram",
    email: "sandeepnarlpauram@gmail.com",
    role: "Team Lead",
  },
  {
    name: "Nagesh Nagam",
    email: "nageshnagam916@gmail.com",
    role: "Data Analyst",
  },
  {
    name: "Sushanth Pindi",
    email: "sushantreddypindi@gmail.com",
    role: "UI Developer",
  },
  {
    name: "Madhulika Narige",
    email: "narigemadhulika2004@gmail.com",
    role: "UX Designer",
  }
];

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formState.name || !formState.email || !formState.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real-world scenario, we would use a backend service
      // Here we'll use mailto link as a fallback
      const mailtoLink = `mailto:sandeepnarlapuram@gmail.com?subject=${encodeURIComponent(
        formState.subject || 'Contact Form Submission'
      )}&body=${encodeURIComponent(
        `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
      )}`;
      
      // Open the mail client
      window.open(mailtoLink, '_blank');
      
      // Show success message
      toast.success("Message prepared for sending! Your default email client should have opened.");
      
      // Clear form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error("Failed to prepare email. Please try again or contact us directly.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet the Team</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get in touch with our team of experts who are dedicated to providing insights on home tech and fashion market trends.
            </p>
          </div>
          
          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarFallback className="text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{member.role}</p>
                  <a 
                    href={`mailto:${member.email}`} 
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail size={16} />
                    <span className="text-sm">{member.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Contact Form Section */}
          <div className="max-w-3xl mx-auto bg-card rounded-lg p-8 shadow-sm border border-border">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  type="text"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Your message here..."
                  required
                />
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  Your message will be sent to: sandeepnarlapuram@gmail.com
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <footer className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>© 2024 HOME TECH ANALYSIS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;

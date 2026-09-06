'use client';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">CONTACT US</h1>
        <p className="text-gray-400 uppercase tracking-widest text-sm">We're here to assist you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Contact Form */}
        <div className="bg-[#111] p-8 md:p-12">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-500">Name</label>
              <input type="text" className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold transition-colors" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-500">Email</label>
              <input type="email" className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold transition-colors" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-500">Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold transition-colors resize-none" required></textarea>
            </div>
            <button type="submit" className="px-10 py-4 bg-white text-dark uppercase tracking-widest text-sm font-semibold hover:bg-gold transition-colors duration-300 mt-4">
              Send Message
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center space-y-12">
          <div>
            <h3 className="font-serif text-2xl mb-4 text-gold">Visit Our Atelier</h3>
            <p className="text-gray-400 leading-relaxed font-light">
              123 Avenue des Champs-Élysées<br/>
              75008 Paris, France
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl mb-4 text-gold">Contact Details</h3>
            <p className="text-gray-400 leading-relaxed font-light">
              contact@luxethreads.com<br/>
              +33 1 23 45 67 89
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

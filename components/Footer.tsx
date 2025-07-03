// components/Footer.tsx
const Footer = () => {
  return (
    <footer className="w-full mt-0 bg-black/20 text-white py-6 text-center text-sm">
      <p>
        © {new Date().getFullYear()} MindFlare. Built with 💡 for daily inspiration.
      </p>
    </footer>
  );
};

export default Footer;

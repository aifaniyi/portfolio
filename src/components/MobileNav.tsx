interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  isOpen: boolean;
  navItems: NavItem[];
  activeSection: string;
  onNavClick: (href: string) => void;
}

export function MobileNav({
  isOpen,
  navItems,
  activeSection,
  onNavClick,
}: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-16 z-40 md:hidden">
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => onNavClick('#')}
      />
      <nav className="fixed top-16 left-0 right-0 bg-background border-b p-4">
        <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => onNavClick(item.href)}
              className={`text-left py-2 px-4 rounded-md transition-colors ${
                activeSection === item.href.substring(1)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

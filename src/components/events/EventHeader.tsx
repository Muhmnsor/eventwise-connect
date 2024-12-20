interface EventHeaderProps {
  title: string;
  showLogo?: boolean;
  logoUrl?: string;
}

export const EventHeader = ({ title, showLogo = true, logoUrl }: EventHeaderProps) => {
  return (
    <div className="bg-white shadow-sm mb-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">{title}</h1>
          {showLogo && logoUrl && (
            <img src={logoUrl} alt={title} className="h-16 w-auto" />
          )}
        </div>
      </div>
    </div>
  );
};
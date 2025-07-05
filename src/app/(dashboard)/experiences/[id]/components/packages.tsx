"use client";

interface Package {
  fromPerson: string;
  toPerson: string;
  cost: string;
  actualCost: string;
}

interface PackagesProps {
  packages: string[];
}

export const Packages: React.FC<PackagesProps> = ({ packages }) => {
  const parsedPackages: Package[] = packages.map((pkg) => JSON.parse(pkg));

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-2">Packages</h3>
      <div className="space-y-4">
        {parsedPackages.map((pkg, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <p>
              <strong>Persons:</strong> {pkg.fromPerson} - {pkg.toPerson}
            </p>
            <p>
              <strong>Cost:</strong> ${pkg.cost}
            </p>
            <p>
              <strong>Actual Cost:</strong> ${pkg.actualCost}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
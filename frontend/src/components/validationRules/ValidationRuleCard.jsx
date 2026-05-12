export default function ValidationRuleCard({
  label,
  value,
  color = "text-white",
}) {
  return (
    <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
      <p className="mb-1 text-xs text-gray-400">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

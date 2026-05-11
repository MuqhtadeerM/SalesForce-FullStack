export const formatRuleName = (name) =>
  name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const getStatusColor = (active) =>
  active
    ? "bg-green-900 text-green-300 border border-green-800"
    : "bg-red-900 text-red-300 border border-red-800";

export const getDotColor = (active) => (active ? "bg-green-400" : "bg-red-400");

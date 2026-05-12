import ValidationToggle from "./ValidationToggle";
import {
  formatRuleName,
  getStatusColor,
  getDotColor,
} from "../../utils/helpers";

export default function ValidationRuleTable({ rules, togglingId, onToggle }) {
  return (
    <div className="overflow-hidden bg-gray-900 border border-gray-800 rounded-2xl">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="px-6 py-4 text-xs font-medium text-left text-gray-400">
              #
            </th>
            <th className="px-6 py-4 text-xs font-medium text-left text-gray-400">
              Rule Name
            </th>
            <th className="px-6 py-4 text-xs font-medium text-left text-gray-400">
              Status
            </th>
            <th className="px-6 py-4 text-xs font-medium text-left text-gray-400">
              Rule ID
            </th>
            <th className="px-6 py-4 text-xs font-medium text-right text-gray-400">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule, index) => (
            <tr
              key={rule.Id}
              className="transition-colors border-b border-gray-800 last:border-0 hover:bg-gray-800"
            >
              <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
              <td className="px-6 py-4">
                <span className="text-sm font-medium text-white">
                  {formatRuleName(rule.ValidationName)}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(rule.Active)}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${getDotColor(rule.Active)}`}
                  />
                  {rule.Active ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-4 font-mono text-xs text-gray-500">
                {rule.Id}
              </td>
              <td className="px-6 py-4 text-right">
                <ValidationToggle
                  active={rule.Active}
                  loading={togglingId === rule.Id}
                  onToggle={() => onToggle(rule.Id, rule.Active)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

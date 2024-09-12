import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { createGoalCompletion } from "../http/create-goal-completion";
import { getPendingGoals } from "../http/get-pedding-goals";
import { OutlineButton } from "./ui/outline-button";

export function PedingGoals() {
  const queryCliente = useQueryClient();

  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: async () => {
      return getPendingGoals();
    },
    staleTime: 60000,
  });
  if (!data) {
    return null;
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId);
    queryCliente.invalidateQueries({ queryKey: ["summary"] });
    queryCliente.invalidateQueries({ queryKey: ["pending-goals"] });
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrenquency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Topic } from "@/data/subtopics";

interface ExpandableTopicItemProps {
  topic: Topic;
  onTopicToggle: (topicId: string) => void;
  onSubtopicToggle: (topicId: string, subtopicId: string) => void;
}

export default function ExpandableTopicItem({
  topic,
  onTopicToggle,
  onSubtopicToggle,
}: ExpandableTopicItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedSubtopics = topic.subtopics.filter((s) => s.completed).length;
  const totalSubtopics = topic.subtopics.length;
  const progressPercentage = (completedSubtopics / totalSubtopics) * 100;

  // Determinar cor baseado na categoria - Dark mode optimized
  let borderColor = "border-slate-600";
  let bgColor = "bg-slate-800";
  let progressColor = "bg-slate-600";
  let textColor = "text-slate-100";

  if (topic.category.includes("Alta")) {
    borderColor = "border-red-700";
    bgColor = "bg-red-950";
    progressColor = "bg-red-600";
    textColor = "text-red-100";
  } else if (topic.category.includes("Média")) {
    borderColor = "border-orange-700";
    bgColor = "bg-orange-950";
    progressColor = "bg-orange-600";
    textColor = "text-orange-100";
  } else if (topic.category.includes("Baixa")) {
    borderColor = "border-green-700";
    bgColor = "bg-green-950";
    progressColor = "bg-green-600";
    textColor = "text-green-100";
  }

  return (
    <Card className={`border-2 ${borderColor} ${bgColor} mb-4 cursor-pointer hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1" onClick={() => setIsExpanded(!isExpanded)}>
            <Checkbox
              checked={topic.completed}
              onCheckedChange={() => onTopicToggle(topic.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className={`text-lg ${textColor}`}>{topic.title}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded ${bgColor} border border-current`}>
                  {completedSubtopics}/{totalSubtopics}
                </span>
              </div>
              <p className={`text-sm mt-1 ${textColor} opacity-80`}>
                Clique para expandir e marcar os sub-temas
              </p>
              <div className="w-full bg-black/30 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className={`${progressColor} h-full transition-all duration-300`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2 hover:bg-white/10 rounded transition-colors flex-shrink-0 ${textColor}`}
          >
            {isExpanded ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className={`border-t border-current/20 pt-4`}>
          <div className="space-y-3">
            {topic.subtopics.map((subtopic) => (
              <div key={subtopic.id} className={`flex items-center gap-3 p-2 rounded hover:bg-white/5 ${textColor}`}>
                <Checkbox
                  checked={subtopic.completed}
                  onCheckedChange={() => onSubtopicToggle(topic.id, subtopic.id)}
                />
                <label className="flex-1 cursor-pointer text-sm">
                  {subtopic.completed ? (
                    <span className="line-through opacity-50">{subtopic.name}</span>
                  ) : (
                    <span>{subtopic.name}</span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

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

  // Determinar cor baseado na categoria
  let borderColor = "border-gray-200";
  let bgColor = "bg-gray-50";
  let progressColor = "bg-gray-600";
  let textColor = "text-gray-900";

  if (topic.category.includes("Alta")) {
    borderColor = "border-red-200";
    bgColor = "bg-red-50";
    progressColor = "bg-red-600";
    textColor = "text-red-900";
  } else if (topic.category.includes("Média")) {
    borderColor = "border-orange-200";
    bgColor = "bg-orange-50";
    progressColor = "bg-orange-600";
    textColor = "text-orange-900";
  } else if (topic.category.includes("Baixa")) {
    borderColor = "border-green-200";
    bgColor = "bg-green-50";
    progressColor = "bg-green-600";
    textColor = "text-green-900";
  }

  return (
    <Card className={`border-2 ${borderColor} ${bgColor} mb-4`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              checked={topic.completed}
              onCheckedChange={() => onTopicToggle(topic.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <CardTitle className={`text-lg ${textColor}`}>{topic.title}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {completedSubtopics} de {totalSubtopics} sub-temas concluídos
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className={`${progressColor} h-full transition-all duration-300`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-black/10 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="border-t border-current/20 pt-4">
          <div className="space-y-3">
            {topic.subtopics.map((subtopic) => (
              <div key={subtopic.id} className="flex items-center gap-3 p-2 rounded hover:bg-black/5">
                <Checkbox
                  checked={subtopic.completed}
                  onCheckedChange={() => onSubtopicToggle(topic.id, subtopic.id)}
                />
                <label className="flex-1 cursor-pointer text-sm">
                  {subtopic.completed ? (
                    <span className="line-through text-gray-500">{subtopic.name}</span>
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

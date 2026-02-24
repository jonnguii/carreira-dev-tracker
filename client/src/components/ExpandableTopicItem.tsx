import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, ChevronUp, Edit2, Trash2, Plus } from "lucide-react";
import { Topic } from "@/data/subtopics";

interface ExpandableTopicItemProps {
  topic: Topic;
  onTopicToggle: (topicId: string) => void;
  onSubtopicToggle: (topicId: string, subtopicId: string) => void;
  onEditTopic?: (topicId: string, newTitle: string) => void;
  onDeleteTopic?: (topicId: string) => void;
  onEditSubtopic?: (topicId: string, subtopicId: string, newName: string) => void;
  onDeleteSubtopic?: (topicId: string, subtopicId: string) => void;
  onAddSubtopic?: (topicId: string, subtopicName: string) => void;
}

export default function ExpandableTopicItem({
  topic,
  onTopicToggle,
  onSubtopicToggle,
  onEditTopic,
  onDeleteTopic,
  onEditSubtopic,
  onDeleteSubtopic,
  onAddSubtopic,
}: ExpandableTopicItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingTopicName, setEditingTopicName] = useState(false);
  const [newTopicName, setNewTopicName] = useState(topic.title);
  const [editingSubtopic, setEditingSubtopic] = useState<string | null>(null);
  const [newSubtopicName, setNewSubtopicName] = useState("");
  const [addingSubtopic, setAddingSubtopic] = useState(false);
  const [newSubtopicInputValue, setNewSubtopicInputValue] = useState("");

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

  const handleSaveTopicName = () => {
    if (newTopicName.trim() && onEditTopic) {
      onEditTopic(topic.id, newTopicName);
      setEditingTopicName(false);
    }
  };

  const handleSaveSubtopicName = (subtopicId: string) => {
    if (newSubtopicName.trim() && onEditSubtopic) {
      onEditSubtopic(topic.id, subtopicId, newSubtopicName);
      setEditingSubtopic(null);
      setNewSubtopicName("");
    }
  };

  const handleAddSubtopic = () => {
    if (newSubtopicInputValue.trim() && onAddSubtopic) {
      onAddSubtopic(topic.id, newSubtopicInputValue);
      setNewSubtopicInputValue("");
      setAddingSubtopic(false);
    }
  };

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
                {editingTopicName ? (
                  <div className="flex gap-2 flex-1" onClick={(e) => e.stopPropagation()}>
                    <Input
                      value={newTopicName}
                      onChange={(e) => setNewTopicName(e.target.value)}
                      className="flex-1"
                      autoFocus
                    />
                    <Button size="sm" onClick={handleSaveTopicName}>
                      Salvar
                    </Button>
                  </div>
                ) : (
                  <>
                    <CardTitle className={`text-lg ${textColor}`}>{topic.title}</CardTitle>
                    <span className={`text-xs px-2 py-1 rounded ${bgColor} border border-current`}>
                      {completedSubtopics}/{totalSubtopics}
                    </span>
                  </>
                )}
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

          {/* Botões de ação */}
          <div className="flex gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className={`${textColor} hover:bg-white/10`}
              onClick={() => setEditingTopicName(!editingTopicName)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`${textColor} hover:bg-white/10 text-destructive`}
              onClick={() => {
                if (confirm(`Deletar "${topic.title}" e todos seus sub-temas?`)) {
                  onDeleteTopic?.(topic.id);
                }
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 hover:bg-white/10 rounded transition-colors ${textColor}`}
            >
              {isExpanded ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
          </div>
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

                {editingSubtopic === subtopic.id ? (
                  <div className="flex gap-2 flex-1">
                    <Input
                      value={newSubtopicName}
                      onChange={(e) => setNewSubtopicName(e.target.value)}
                      className="flex-1"
                      autoFocus
                    />
                    <Button size="sm" onClick={() => handleSaveSubtopicName(subtopic.id)}>
                      Salvar
                    </Button>
                  </div>
                ) : (
                  <>
                    <label className="flex-1 cursor-pointer text-sm">
                      {subtopic.completed ? (
                        <span className="line-through opacity-50">{subtopic.name}</span>
                      ) : (
                        <span>{subtopic.name}</span>
                      )}
                    </label>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 hover:bg-white/10"
                      onClick={() => {
                        setEditingSubtopic(subtopic.id);
                        setNewSubtopicName(subtopic.name);
                      }}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 hover:bg-white/10 text-destructive"
                      onClick={() => {
                        if (confirm(`Deletar "${subtopic.name}"?`)) {
                          onDeleteSubtopic?.(topic.id, subtopic.id);
                        }
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </>
                )}
              </div>
            ))}

            {/* Adicionar novo sub-tema */}
            {addingSubtopic ? (
              <div className="flex gap-2 p-2">
                <Input
                  value={newSubtopicInputValue}
                  onChange={(e) => setNewSubtopicInputValue(e.target.value)}
                  placeholder="Nome do novo sub-tema"
                  autoFocus
                />
                <Button size="sm" onClick={handleAddSubtopic}>
                  Adicionar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setAddingSubtopic(false);
                    setNewSubtopicInputValue("");
                  }}
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2 gap-2"
                onClick={() => setAddingSubtopic(true)}
              >
                <Plus className="w-4 h-4" />
                Adicionar Sub-tema
              </Button>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

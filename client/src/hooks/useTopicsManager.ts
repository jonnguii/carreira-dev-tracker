import { useState, useEffect } from "react";
import { Topic, TOPICS_WITH_SUBTOPICS } from "@/data/subtopics";

export function useTopicsManager() {
  const [topics, setTopics] = useState<Topic[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("topics-data");
    if (saved) {
      try {
        setTopics(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar tópicos:", e);
        setTopics(TOPICS_WITH_SUBTOPICS);
      }
    } else {
      setTopics(TOPICS_WITH_SUBTOPICS);
    }
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    if (topics.length > 0) {
      localStorage.setItem("topics-data", JSON.stringify(topics));
    }
  }, [topics]);

  const editTopic = (topicId: string, newTitle: string, newCategory?: string) => {
    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              title: newTitle,
              category: newCategory || topic.category,
            }
          : topic
      )
    );
  };

  const editSubtopic = (topicId: string, subtopicId: string, newName: string) => {
    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              subtopics: topic.subtopics.map((sub) =>
                sub.id === subtopicId ? { ...sub, name: newName } : sub
              ),
            }
          : topic
      )
    );
  };

  const addSubtopic = (topicId: string, subtopicName: string) => {
    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              subtopics: [
                ...topic.subtopics,
                {
                  id: `${topicId}-${Date.now()}`,
                  name: subtopicName,
                  completed: false,
                },
              ],
            }
          : topic
      )
    );
  };

  const deleteSubtopic = (topicId: string, subtopicId: string) => {
    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              subtopics: topic.subtopics.filter((sub) => sub.id !== subtopicId),
            }
          : topic
      )
    );
  };

  const addTopic = (newTopic: Omit<Topic, "id">) => {
    const newId = `topic-${Date.now()}`;
    setTopics((prev) => [
      ...prev,
      {
        ...newTopic,
        id: newId,
      },
    ]);
    return newId;
  };

  const deleteTopic = (topicId: string) => {
    setTopics((prev) => prev.filter((topic) => topic.id !== topicId));
  };

  return {
    topics,
    setTopics,
    editTopic,
    editSubtopic,
    addSubtopic,
    deleteSubtopic,
    addTopic,
    deleteTopic,
  };
}

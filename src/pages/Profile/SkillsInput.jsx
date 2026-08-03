import { useState } from "react";

function SkillsInput({
  skills,
  setSkills,
  disabled,
}) {
  const [input, setInput] = useState("");

  const addSkill = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    if (!input.trim()) return;

    if (skills.includes(input.trim())) return;

    setSkills([...skills, input.trim()]);

    setInput("");
  };

  const removeSkill = (skill) => {
    setSkills(
      skills.filter((item) => item !== skill)
    );
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Skills
      </h2>

      {!disabled && (
        <input
          className="mb-4 w-full rounded-lg border p-3"
          placeholder="Press Enter to add skill"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={addSkill}
        />
      )}

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            onClick={() =>
              !disabled && removeSkill(skill)
            }
            className="cursor-pointer rounded-full bg-blue-100 px-4 py-2 text-blue-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillsInput;
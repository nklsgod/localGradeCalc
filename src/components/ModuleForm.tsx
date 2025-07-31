import { useState } from "react";
import { Module } from "../types";

interface ModuleFormProps {
  onAddModule: (module: Module) => void;
}

const ModuleForm = ({ onAddModule }: ModuleFormProps) => {
  const [formData, setFormData] = useState<
    Omit<Module, "grade"> & { grade: string }
  >({
    moduleNumber: "",
    moduleName: "",
    moduleECTS: 6,
    isFirstOrSecondYear: false,
    grade: "",
    modulePool: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.moduleNumber ||
      !formData.moduleName ||
      !formData.grade ||
      !formData.modulePool
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const grade = parseFloat(formData.grade);
    if (isNaN(grade) || grade < 1 || grade > 6) {
      alert("Please enter a valid grade between 1 and 6");
      return;
    }

    const module: Module = {
      ...formData,
      grade,
    };

    onAddModule(module);
    setFormData({
      moduleNumber: "",
      moduleName: "",
      moduleECTS: 6,
      isFirstOrSecondYear: false,
      grade: "",
      modulePool: "",
    });
  };

  return (
    <form className="module-form" onSubmit={handleSubmit}>
      <h2>Add Module</h2>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="moduleNumber">Module Number *</label>
          <input
            type="text"
            id="moduleNumber"
            value={formData.moduleNumber}
            onChange={(e) =>
              setFormData({ ...formData, moduleNumber: e.target.value })
            }
            placeholder="e.g., CS101"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="moduleName">Module Name *</label>
          <input
            type="text"
            id="moduleName"
            value={formData.moduleName}
            onChange={(e) =>
              setFormData({ ...formData, moduleName: e.target.value })
            }
            placeholder="e.g., Introduction to Computer Science"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="moduleECTS">ECTS Credits *</label>
          <select
            id="moduleECTS"
            value={formData.moduleECTS}
            onChange={(e) =>
              setFormData({
                ...formData,
                moduleECTS: parseInt(e.target.value) as 3 | 5 | 6 | 9 | 10 | 15,
              })
            }
          >
            <option value={3}>3 ECTS</option>
            <option value={5}>5 ECTS</option>
            <option value={6}>6 ECTS</option>
            <option value={9}>9 ECTS</option>
            <option value={10}>10 ECTS</option>
            <option value={15}>15 ECTS</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="grade">Grade *</label>
          <input
            type="number"
            id="grade"
            min="1"
            max="6"
            step="0.1"
            value={formData.grade}
            onChange={(e) =>
              setFormData({ ...formData, grade: e.target.value })
            }
            placeholder="1.0 - 6.0"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="modulePool">Module Pool *</label>
          <input
            type="text"
            id="modulePool"
            value={formData.modulePool}
            onChange={(e) =>
              setFormData({ ...formData, modulePool: e.target.value })
            }
            placeholder="e.g., Core, Elective, Minor"
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="isFirstOrSecondYear" className="checkbox-label">
            <input
              type="checkbox"
              id="isFirstOrSecondYear"
              checked={formData.isFirstOrSecondYear}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isFirstOrSecondYear: e.target.checked,
                })
              }
            />
            First or Second Year (50% weight)
          </label>
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Add Module
      </button>
    </form>
  );
};

export default ModuleForm;

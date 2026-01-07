import { type FormEvent, useState } from "react";
import { api } from "@/utils/api";

const categoryOptions = ["智能合约", "DeFi", "NFT", "Layer2", "安全审计"];
const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const tagOptions = ["Solidity", "Hardhat", "Aave", "Token", "治理", "收益"];

export const InstructorNewCoursePage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [level, setLevel] = useState(levelOptions[0]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const toggleTag = (tag: string) => {
    console.log('toggleTag', tag)
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const payload = {
        title,
        price_amount: price,
        description,
        category,
        level,
        tags: selectedTags,
      };
      const result = await api.createCourseDraft(payload);
      setMessage(`草稿创建成功：${result.id}`);
      setTitle("");
      setPrice("");
      setCategory(categoryOptions[0]);
      setLevel(levelOptions[0]);
      setSelectedTags([]);
      setDescription("");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "创建失败");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="glass-panel p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">New Course</p>
        <h1 className="text-3xl font-semibold">创建课程草稿</h1>
        <p className="text-sm text-muted">草稿提交后由后端审核，通过后可在 CourseMarket 链上创建。</p>
      </div>
      <form onSubmit={handleSubmit} className="glass-panel space-y-5 p-6">
        <div className="space-y-2">
          <label className="text-sm text-muted" htmlFor="title">课程名称</label>
          <input
            className="simple-input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            placeholder="例如：Solidity 进阶"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted" htmlFor="price">价格（YDT）</label>
          <input
            className="simple-input"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
            placeholder="120"
            type="number"
            min="0"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-muted" htmlFor="category">课程类别</label>
            <select className="simple-input" value={category} onChange={(event) => setCategory(event.target.value)}>
              {categoryOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted" htmlFor="level">课程等级</label>
            <select className="simple-input" value={level} onChange={(event) => setLevel(event.target.value)}>
              {levelOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted" htmlFor="tag">标签（可多选）</label>
          <div className="flex flex-wrap gap-3">
            {tagOptions.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`chip ${active ? "chip-active" : ""}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted" htmlFor="description">简介</label>
          <textarea
            className="simple-textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            placeholder="课程亮点、学习目标..."
          />
        </div>
        <button type="submit" className="plain-button w-full md:w-fit" disabled={submitting}>
          {submitting ? "提交中..." : "提交草稿"}
        </button>
        {message && <p className="text-sm text-emerald-400">{message}</p>}
      </form>
    </section>
  );
};

export default InstructorNewCoursePage;

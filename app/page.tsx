"use client";
// import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import axios from "@/lib/axios";
import { create } from "domain";

export default function Home() {
  // 使用 useState 来管理输入框的值
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [todoTit, setTodoTit] = useState("");
  const [todoDes, setTodoDes] = useState("");
  const [priority, setPriority] = useState(3);
  const [todoCategory, setTodoCategory] = useState("");

  const [amount, setAmount] = useState(0);
  const [amountDes, setAmountDes] = useState("");

  useEffect(() => {
    axios
      .get("/diaryEntry")
      .then((res) => {
        console.log(res, "日记");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 处理输入框内容变化的函数
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleChange = (type: string) => {
    if (type === "amount") {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        setAmount(Number(e.target.value));
    } else if (type === "amountDes") {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        setAmountDes(e.target.value);
    } else if (type === "todoTit") {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        setTodoTit(e.target.value);
    }  else if (type === "todoDes") {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        setTodoDes(e.target.value);
    } else if (type === "priority") {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        setPriority(~~e.target.value);
    } else if (type === "todoCategory") {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        setTodoCategory(e.target.value);
    }
  };

  // 处理提交按钮点击的函数
  const handleSubmit = () => {
    // 这里可以添加提交输入内容后的逻辑，例如发送请求等
    console.log("提交的内容是:", title);
    console.log("提交的内容是:", content);
    axios
      .post("/diaryEntry", {
        title: title,
        content: content,
        date: 20250419,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleSubmitTodo = () => {
    // 这里可以添加提交输入内容后的逻辑，例如发送请求等
    axios
      .post("/todo", {
        title: todoTit,
        description: todoDes,
        priority: priority,
        category: todoCategory,
        createdAt: 20250419,
        // date: 20250419,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitAmount = () => {
    // 这里可以添加提交输入内容后的逻辑，例如发送请求等
    axios
      .post("/finance", {
        amount: amount,
        description: amountDes,
        date: 20250419,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.page}>
      {/* 左边导航栏 */}
      <div className={styles.sidebar}>
        <nav>
          <ul>
            <li>
              <a href="#">导航项 1</a>
            </li>
            <li>
              <a href="#">导航项 2</a>
            </li>
            <li>
              <a href="#">导航项 3</a>
            </li>
          </ul>
        </nav>
      </div>
      {/* 右边主体内容 */}
      <div className={styles.mainContent}>
        <div>提交日记</div>
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="请输入日记标题"
          className={styles.input}
        />

        <input
          type="text"
          value={content}
          onChange={handleTextChange}
          placeholder="请输入日记内容"
          className={styles.input}
        />
        <button onClick={handleSubmit} className={styles.submitButton}>
          提交日记
        </button>
        <div>提交 todo</div>

        <input
          type="text"
          value={todoTit}
          onChange={handleChange("todoTit")}
          placeholder="请输入todo标题"
          className={styles.input}
        />

        <input
          type="text"
          value={todoDes}
          onChange={handleChange("todoDes")}
          placeholder="请输入todo 描述"
          className={styles.input}
        />

        <input
          type="text"
          value={priority}
          onChange={handleChange("priority")}
          placeholder="请输入priority"
          className={styles.input}
        />

        <input
          type="text"
          value={todoCategory}
          onChange={handleChange("todoCategory")}
          placeholder="请输入 todo 分类"
          className={styles.input}
        />
        <button onClick={handleSubmitTodo} className={styles.submitButton}>
          提交 todo
        </button>

        <div>提交记账</div>
        <input
          type="text"
          value={amount}
          onChange={handleChange("amount")}
          placeholder="请输入日记标题"
          className={styles.input}
        />

        <input
          type="text"
          value={amountDes}
          onChange={handleChange("amountDes")}
          placeholder="请输入日记内容"
          className={styles.input}
        />
        <button onClick={handleSubmitAmount} className={styles.submitButton}>
          提交记账
        </button>
      </div>
    </div>
  );
}

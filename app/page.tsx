'use client';
// import Image from "next/image";
// import styles from "./page.module.css";
import { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Collapse,
  Dialog,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Typography,
} from '@mui/material';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';
import axios from '@/lib/axios';
import dayjs from 'dayjs';
import Calendar from '../components/Calendar';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { config } from 'process';
// 此问题通常是由于 dayjs 导入或类型定义问题导致的。
// 尝试直接导入默认导出的 dayjs 来解决该问题。
dayjs().format();

export default function Home() {
  // 使用 useState 来管理输入框的值
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [todoData, setTodoData] = useState<any>([]);
  const [diaryData, setDiaryData] = useState<any>([]);
  const [financeData, setFinanceData] = useState<any>([]);

  const [showTodo, setShowTodo] = useState(false);
  const [showDiary, setShowDiary] = useState(false);
  const [showFinance, setShowFinance] = useState(false);

  const [todoTit, setTodoTit] = useState('');
  const [todoDes, setTodoDes] = useState('');
  const [priority, setPriority] = useState<undefined | string>('1');
  const [todoCategory, setTodoCategory] = useState<undefined | string>('1');

  const [amount, setAmount] = useState(0);
  const [amountType, setAmountType] = useState('Income');
  const [amountDes, setAmountDes] = useState('');

  const [item1, setItem1] = useState(false);
  const [item2, setItem2] = useState(false);
  const [item3, setItem3] = useState(false);

  const [modelTodo, setModelTodo] = useState(false);
  const [model, setModel] = useState(false);
  const [modelFinance, setModelFinance] = useState(false);

  const [events, setEvents] = useState<{ title: string; date: string }[]>([]);

  useEffect(() => {
    Promise.all([
      axios.get('/diaryEntry'),
      axios.get('/todo'),
      axios.get('/finance'),
    ])
      .then((res) => {
        console.log(res, 'res');
        const allEvents = [];
        if (res[0] && res[0].length > 0) {
          setDiaryData(res[0]);
          res[0].forEach((item: any) => {
            allEvents.unshift({
              title: item.title,
              date: dayjs('' + item.date, 'YYYYMMDD').format('YYYY-MM-DD'),
            });
          });
        }
        if (res[1] && res[1].length > 0) {
          setTodoData(res[1]);
          res[1].forEach((item: any) => {
            allEvents.unshift({
              title: item.title,
              date: dayjs('' + item.createdAt, 'YYYYMMDD').format('YYYY-MM-DD'),
            });
          });
        }
        if (res[2] && res[2]?.length > 0) {
          setFinanceData(res[2]);
          res[2].forEach((item: any) => {
            allEvents.unshift({
              title: item.description || item.amount,
              date: dayjs('' + item.date, 'YYYYMMDD').format('YYYY-MM-DD'),
            });
          });
        }
        setEvents(allEvents);
        console.log('allEvents :', allEvents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggle = (type: string) => {
    if (type === 'todo') {
      return () => {
        setShowTodo((preV) => !preV);
        setShowDiary(false);
        setShowFinance(false);
      };
    } else if (type === 'diary') {
      return () => {
        setShowDiary((preV) => !preV);
        setShowTodo(false);
        setShowFinance(false);
      };
    } else if (type === 'finance') {
      return () => {
        setShowFinance((preV) => !preV);
        setShowTodo(false);
        setShowDiary(false);
      };
    }
  };

  const handleChange = (type: string) => {
    if (type === 'title') {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value);
    } else if (type === 'content') {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        setContent(e.target.value);
    } else if (type === 'amount') {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        setAmount(Number(e.target.value));
    } else if (type === 'amountDes') {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        setAmountDes(e.target.value);
    } else if (type === 'todoTit') {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        setTodoTit(e.target.value);
    } else if (type === 'todoDes') {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        setTodoDes(e.target.value);
    }
  };

  const handleChangePriority = (e: SelectChangeEvent) => {
    setPriority(e.target.value);
  };

  const handleChangeCategory = (e: SelectChangeEvent) => {
    setTodoCategory(e.target.value);
  };

  const handleChangeAmountType = (e: SelectChangeEvent) => {
    setAmountType(e.target.value);
  };

  const handleClick = (item: string) => {
    if (item === 'item1') {
      return () => setItem1((preV) => !preV);
    } else if (item === 'item2') {
      return () => setItem2((preV) => !preV);
    } else if (item === 'item3') {
      return () => setItem3((preV) => !preV);
    }
  };

  const handleModel = () => {
    setModel((preV) => !preV);
  };

  const handleModelFinance = () => {
    setModelFinance((preV) => !preV);
  };

  const handleModelTodo = () => {
    setModelTodo((preV) => !preV);
  };

  // 处理提交按钮点击的函数
  const handleSubmit = () => {
    if (title === '' || content === '') {
      console.log('请输入标题和内容');
      return;
    }

    axios
      .post('/diaryEntry', {
        title: title,
        content: content,
        date: 20250419,
      })
      .then((res) => {
        console.log(res.data);
        setTitle('');
        setContent('');
        setModel(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitTodo = () => {
    // 这里可以添加提交输入内容后的逻辑，例如发送请求等
    if (todoTit === '') {
      console.log('请输入标题');
      return;
    }
    axios
      .post('/todo', {
        title: todoTit,
        description: todoDes,
        priority: Number(priority) || 3,
        category: todoCategory,
        createdAt: 20250419,
        // date: 20250419,
      })
      .then((res) => {
        console.log(res.data);
        setTodoTit('');
        setTodoDes('');
        setModelTodo(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitAmount = () => {
    // 这里可以添加提交输入内容后的逻辑，例如发送请求等
    if (amount === 0) {
      console.log('请输入金额和描述');
      return;
    }
    axios
      .post('/finance', {
        amount: amount,
        description: amountDes,
        type: amountType,
        date: 20250419,
      })
      .then((res) => {
        console.log(res.data);
        setAmount(0);
        setAmountDes('');
        setModelFinance(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box display={'flex'}>
      {/* 左边导航栏 */}
      <Box sx={{ width: '180px', bgcolor: '#f0f0f0', height: '100vh' }}>
        <List>
          <ListItem>
            <ListItemText primary="首页" />
          </ListItem>
          <ListItemButton onClick={handleClick('item1')}>
            <ListItemText primary="Todo 管理" />
            {item1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={item1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 3 }} onClick={toggle('todo')}>
                <ListItemText primary="Todo 列表" sx={{ fontSize: '12px' }} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 3 }} onClick={handleModelTodo}>
                <ListItemText primary="添加 Todo" sx={{ fontSize: '12px' }} />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick('item2')}>
            <ListItemText primary="日记管理" />
            {item1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={item2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 3 }} onClick={toggle('diary')}>
                <ListItemText primary="日记列表" sx={{ fontSize: '12px' }} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 3 }} onClick={handleModel}>
                <ListItemText primary="每日一记" sx={{ fontSize: '12px' }} />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick('item3')}>
            <ListItemText primary="资金管理" />
            {item1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={item3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 3 }} onClick={toggle('finance')}>
                <ListItemText primary="资金列表" sx={{ fontSize: '12px' }} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 3 }} onClick={handleModelFinance}>
                <ListItemText primary="记一笔" sx={{ fontSize: '12px' }} />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>

      {/* 右边主体内容 */}
      <Box flex={1}>
        <Box>
          <List>
            {showTodo &&
              todoData &&
              todoData.length > 0 &&
              todoData.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    component="div"
                    sx={{ display: 'flex' }}
                  >
                    <Box flex={1}>{item.title}</Box>
                    <Box flex={1}>{item.description}</Box>
                    <Box flex={1}>{item.priority}</Box>
                    <Box flex={1}>{item.category}</Box>
                    <Box flex={1}>{item.status}</Box>
                  </ListItem>
                );
              })}

            {showDiary &&
              diaryData &&
              diaryData.length > 0 &&
              diaryData.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    component="div"
                    sx={{ display: 'flex' }}
                  >
                    <Box flex={1}>{item.title}</Box>
                    <Box flex={1}>{item.content}</Box>
                    <Box flex={1}>{item.date}</Box>
                  </ListItem>
                );
              })}

            {showFinance &&
              financeData &&
              financeData.length > 0 &&
              financeData.map((item) => (
                <ListItem
                  key={item.id}
                  component="div"
                  sx={{ display: 'flex' }}
                >
                  <Box flex={1}>{item.amount}</Box>
                  <Box flex={1}>{item.description}</Box>
                  <Box flex={1}>{item.type}</Box>
                  <Box flex={1}>{item.date}</Box>
                </ListItem>
              ))}
          </List>
        </Box>
        {/* 插入日历组件 */}
        <Calendar selfEvents={events} />
      </Box>

      <Dialog
        open={modelTodo}
        onClose={handleModelTodo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box width={'450px'} sx={{ p: 3 }}>
          <Typography component={'h3'} textAlign={'center'}>
            提交 Todo
          </Typography>
          <Box sx={{ m: 3 }}>
            <Input
              fullWidth
              type="text"
              value={todoTit}
              onChange={handleChange('todoTit')}
              placeholder="请输入 Todo 标题"
            />
          </Box>

          <Box sx={{ m: 3 }}>
            <Input
              fullWidth
              type="text"
              value={todoDes}
              onChange={handleChange('todoDes')}
              placeholder="请输入 Todo 描述"
            />
          </Box>

          <Box sx={{ m: 3 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              value={priority}
              label="优先级"
              onChange={handleChangePriority}
            >
              <MenuItem value={'1'}>低</MenuItem>
              <MenuItem value={'2'}>中</MenuItem>
              <MenuItem value={'3'}>高</MenuItem>
            </Select>
          </Box>

          <Box sx={{ m: 3 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              value={todoCategory}
              label="优先级"
              onChange={handleChangeCategory}
            >
              <MenuItem value={'1'}>运动</MenuItem>
              <MenuItem value={'2'}>休息</MenuItem>
              <MenuItem value={'3'}>工作</MenuItem>
              <MenuItem value={'4'}>阅读</MenuItem>
            </Select>
          </Box>

          <Box sx={{ m: 3, textAlign: 'center' }}>
            <Button variant="contained" onClick={handleSubmitTodo}>
              提交 Todo
            </Button>
          </Box>
        </Box>
      </Dialog>

      <Dialog
        open={model}
        onClose={handleModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box width={'450px'} sx={{ p: 3 }}>
          <Typography component={'h3'} textAlign={'center'}>
            提交日记
          </Typography>
          <Box sx={{ m: 3 }}>
            <Input
              fullWidth
              type="text"
              value={title}
              onChange={handleChange('title')}
              placeholder="请输入日记标题"
            />
          </Box>

          <Box sx={{ m: 3 }}>
            <Input
              fullWidth
              type="text"
              value={content}
              onChange={handleChange('content')}
              placeholder="请输入日记"
            />
          </Box>

          <Box sx={{ m: 3, textAlign: 'center' }}>
            <Button variant="contained" onClick={handleSubmit}>
              提交日记
            </Button>
          </Box>
        </Box>
      </Dialog>

      <Dialog
        open={modelFinance}
        onClose={handleModelFinance}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box width={'450px'} sx={{ p: 3 }}>
          <Typography component={'h3'} textAlign={'center'}>
            聚宝盆
          </Typography>
          <Box sx={{ m: 3 }}>
            <Input
              fullWidth
              type="text"
              value={amount}
              onChange={handleChange('amount')}
              placeholder="请输入金额"
            />
          </Box>

          <Box sx={{ m: 3 }}>
            <Input
              fullWidth
              type="text"
              value={amountDes}
              onChange={handleChange('amountDes')}
              placeholder="请输入消费备注"
            />
          </Box>

          <Box sx={{ m: 3 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              value={amountType}
              label="是收入还是支出"
              onChange={handleChangeAmountType}
            >
              <MenuItem value={'Income'}>收入（为自己的努力加油）</MenuItem>
              <MenuItem value={'Outflow'}>支出（高兴一下）</MenuItem>
            </Select>
          </Box>

          <Box sx={{ m: 3, textAlign: 'center' }}>
            <Button variant="contained" onClick={handleSubmitAmount}>
              存一笔
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

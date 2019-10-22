-- 功能一：创建新闻表 
-- 1：表名 xz_news
-- 2：几列 4
-- 3：列名 id/title/img_url/ctie/point/content
-- 4:类型
-- id     INT
-- title  VARCHAR(255)
-- img_url VARCHAR(255)
-- ctime   DATETIME
-- point   INT
-- content VARCHAR(2000)
-- 5:添加20条件
USE xz;
CREATE TABLE xz_news(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title  VARCHAR(255),
    img_url VARCHAR(255),
    ctime   DATETIME,
    point   INT,
    content VARCHAR(2000)
);

INSERT INTO xz_news VALUES(null,'123','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'223','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'323','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'423','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'523','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'623','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'723','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'823','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'923','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'1023','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'1123','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'1223','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'1323','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'1423','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'1523','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'1623','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'1723','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'1823','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'1923','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'2023','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'2123','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'2223','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'2323','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'2423','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'2523','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'2623','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'2723','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'2823','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'2923','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'3023','http://127.0.0.1:3000/1.png',now(),0,'123');

-- 购物车功能  
CREATE TABLE xz_cart(
    id INT PRIMARY KEY AUTO_INCREMENT,
    lid    INT,
    uid     INT,
    count    INT,
    lname VARCHAR(255),
    price DECIMAL(10,2)
);

-- 再添加一列,更新表数据
USE xz;
ALTER TABLE xz_cart ADD img_url VARCHAR(255);
UPDATE xz_laptop SET img_url  = '01.jpg';
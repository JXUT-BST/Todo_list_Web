### 请求的根路径

> http://47.96.122.117:10531/



### 登录账户

+ 接口URL：  /login
+ 调用方式： GET
+ 参数格式：

| 参数名称 | 参数类型 | 参数位置 | 参数说明 |
| -------- | -------- | -------- | -------- |
| username | String   | url      | 用户名   |

+ 响应格式：

| 数据名称 | 数据类型 | 说明                                      |
| -------- | -------- | ----------------------------------------- |
| code     | Number   | 错误码0为成功, 1为请求错误, 2为服务器错误 |
| msg      | String   | 对 code 字段的详细说明                    |
| token    | String   | 用户登录认证(JWT)                         |


+ 返回示例：

```json
{
    "code": 0,
    "msg": "Login success.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNoYXIiLCJleHAiOjE2NDYxMzY0NDIsImlzcyI6IkNoYXIiLCJuYmYiOjE2NDYxMjkxODJ9.ilYswuX3STSj6E0Yj5vuvx2gQfQWriObpEWEbgsC6jI"
}

```





### 注册账户

+ 接口URL：  /register
+ 调用方式： POST
+ 参数格式：

| 参数名称 | 参数类型 | 参数位置 | 参数说明 |
| -------- | -------- | -------- | -------- |
| username | String   | Body     | 用户名称 |
| password | String   | Body     | 密码     |

+ 响应格式：

| 数据名称 | 数据类型 | 说明                                      |
| -------- | -------- | ----------------------------------------- |
| code     | Number   | 错误码0为成功, 1为请求错误, 2为服务器错误 |
| msg      | String   | 对 code 字段的详细说明                    |
| token    | String   | 用户登录认证(JWT)                         |

+ 返回示例：

```json
{
    "code": 0,
    "msg": "Register success.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Illlb2wiLCJleHAiOjE2NDYxNDAyODUsImlzcyI6IkNoYXIiLCJuYmYiOjE2NDYxMzMwMjV9.pa5mfVi57LajDDkhFcXpTabR4EApJH5w3MhyMPER3c4"
}
```





### 添加TODO

+ 接口URL：  /add
+ 调用方式： POST
+ 参数格式：

| 参数名称  | 参数类型 | 参数位置 | 参数说明                              |
| --------- | -------- | -------- | ------------------------------------- |
| event     | String   | Body     | 代办事项                              |
| condition | Bool     | Body     | 待办事项状态, false为待办, true为已办 |
| date      | int      | Body     | 代办事项时间(Unix时间戳精确到秒)      |
| x-Token   | String   | Headers  | 用户登录认证(JWT)                     |

+ 响应格式：

| 数据名称 | 数据类型 | 说明                                      |
| -------- | -------- | ----------------------------------------- |
| code     | Number   | 错误码0为成功, 1为请求错误, 2为服务器错误 |
| msg      | String   | 对 code 字段的详细说明                    |
| token    | String   | 用户登录认证(JWT)                         |

+ 返回示例：

```json
{
    "code": 0,
    "msg": "Add todo successfully."
}
```

### 删除TODO

+ 接口URL：  /delete
+ 调用方式： DELETE
+ 参数格式：

| 参数名称 | 参数类型 | 请求位置 | 参数说明                         |
| -------- | -------- | -------- | -------------------------------- |
| event    | String   | Body     | 代办事项                         |
| date     | int      | Body     | 代办事项时间(Unix时间戳精确到秒) |
| x-Token  | String   | Headers  | 用户登录认证(JWT)                |

+ 响应格式：

| 数据名称 | 数据类型 | 说明                                      |
| -------- | -------- | ----------------------------------------- |
| code     | Number   | 错误码0为成功, 1为请求错误, 2为服务器错误 |
| msg      | String   | 对 code 字段的详细说明                    |
| token    | String   | 用户登录认证(JWT)                         |

+ 返回示例：

```json
{
    "code": 0,
    "msg": "Add todo successfully."
}
```

### 修改TODO状态(代办/已完成)

+ 接口URL：  /exchange
+ 调用方式： PUT
+ 参数格式：

| 参数名称 | 参数类型 | 参数位置 | 参数说明                         |
| -------- | -------- | -------- | -------------------------------- |
| event    | String   | Body     | 代办事项                         |
| date     | int      | Body     | 代办事项时间(Unix时间戳精确到秒) |
| x-Token  | String   | Headers  | 用户登录认证(JWT)                |

+ 响应格式：

| 数据名称 | 数据类型 | 说明                                      |
| -------- | -------- | ----------------------------------------- |
| code     | Number   | 错误码0为成功, 1为请求错误, 2为服务器错误 |
| msg      | String   | 对 code 字段的详细说明                    |
| token    | String   | 用户登录认证(JWT)                         |

+ 返回示例：

```json
{
  "code": 0,
  "data": [
    {
      "username": "Char",
      "event": "刷牙",
      "condition": false,
      "date": 1646105867
    },
    {
      "username": "Char",
      "event": "洗脸",
      "condition": false,
      "date": 1646129385
    },
    {
      "username": "Char",
      "event": "洗脸",
      "condition": false,
      "date": 1646133308
    }
  ],
  "msg": "Todolist get successfully."
}
```

### 获取用户所有TODO

+ 接口URL：  /list
+ 调用方式： GET
+ 参数格式：

| 参数名称 | 参数类型 | 参数位置 | 参数说明              |
| -------- | -------- | -------- | --------------------- |
| x-Token  | String   | Headers  | 用户登录状态认证(Jwt) |

+ 响应格式：

| 数据名称 | 数据类型 | 说明                                      |
| -------- | -------- | ----------------------------------------- |
| code     | Number   | 错误码0为成功, 1为请求错误, 2为服务器错误 |
| msg      | String   | 对 code 字段的详细说明                    |
| token    | String   | 用户登录认证(JWT)                         |

+ 返回示例：

```json
{
    "code": 0,
    "data": [
        {
            "username": "MrNobody",
            "event": "拉屎",
            "condition": false,
            "date": 1646742132
        }
    ],
    "msg": "Todolist get successfully."
}
```
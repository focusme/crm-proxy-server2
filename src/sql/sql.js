function replaceAllDQM(str) {
  let content = '';
  str = str.split('"');
  let length = str.length;
  if (length > 1) {
    for (let i = 0; i < length; i++) {
      if (i === 0) {
        content += str[i]
      } else {
        content += '\\"' + str[i]
      }
    }
  } else {
    content = str[0]
  }
  return content;
}

module.exports = {
  // url,agent,status,message,ms,uid = 0'
  saveRequest(host, url, agent, status, message, ms, uid = 0) {
    let time = new Date().getTime();
    return `insert into request_info (\`request_url\`,\`request_elapsed\`,\`request_time\`,\`uid\`,\`request_status\`,\`request_agent\`,\`request_message\`,\`request_host\`)
          value ("${url}","${ms}","${time}","${uid}","${status}","${agent}","${message}","${host}")`
  },
  saveLabel(label, uid = 0) {
    let time = new Date().getTime();
    return `insert into article_label (\`label\`,\`create_time\`,\`uid\`) value ("${label}","${time}","${uid}")`
  },
  queryLabels(uid = 0) {
    return `select * from article_label where \`uid\`= "${uid}" order by \`create_time\` desc`
  },
  deleteLabel(id, uid = 0) {
    return `delete from article_label where \`id\` = ${id} and \`uid\` = ${uid}`;
  },
  updateLabel(data, uid = 0) {
    return `update article_label set \`label\` = "${data.label}" where \`id\` = ${data.id} and \`uid\` = ${uid} `
  },
  saveArticle(article, uid = 0) {
    let updateTime = new Date().getTime();
    let content = replaceAllDQM(article.article_content);

    let sql = `insert into article_content (\`article_title\`,\`article_content\`,\`article_label\`,\`article_state\`,
      \`article_updatetime\`,\`uid\`)
          value ("${article.article_title}","${content}","${article.article_labels}","${article.article_state}",
        "${updateTime}","${uid}")
      `;
    return sql
  },
  updateArticle(article, uid = 0) {
    let time = new Date().getTime();
    let content = replaceAllDQM(article.article_content);
    return `update article_content set \`article_content\` = "${content}", \`article_title\` = "${article.article_title}", \`article_label\`= "${article.article_label}", \`article_updatetime\` = "${time}"
        ,  \`article_state\`="${article.article_state}" where \`article_id\` = "${article.article_id}" and \`uid\` = "${uid}"`;

  },
  queryArticles(uid = 0) {
    return `select article_content.*,user_info.name as userName from article_content,user_info where \`uid\`= "${uid}" and article_content.uid = user_info.id order by \`article_updatetime\` desc`;
  },
  queryCommonArticles() {
    return `select article_content.*,user_info.name as userName from article_content left join user_info on  article_content.uid = user_info.id where \`article_state\`= "1"  order by \`article_updatetime\` desc`;
  },
  queryCommonArticleById(id) {
    return `select article_content.*,user_info.name as userName from article_content left join user_info on  article_content.uid = user_info.id where \`article_state\`= "1" and \`article_id\` ="${id}"`;
  },
  queryArticleById(id, uid) {
    return `select article_content.* from article_content where  \`article_id\` ="${id}" and \`uid\` = "${uid}"`;
  },
  selectUser(email) {
    return `select * from user_info where \`email\` like "${email}"`
  },
  addUser(email, passWord, name, leave = 0) {
    let time = new Date().getTime();
    return `insert into user_info (\`email\`,\`passWord\`,\`createTime\`,\`updateTime\`,\`leave\`,\`name\`,\`type\`) value ("${email}","${passWord}","${time}","${time}","${leave}","${name}","coding")`

  },
  updateGitInfo(github, avatar_url) {
    let time = new Date().getTime();
    return   `update user_info set \`github\` = "${github}", \`avatar_url\`= "${avatar_url}",\`updateTime\` = "${time}"`
  },
  saveGitInfo(email, name, github, avatar_url, leave = 0) {
    let time = new Date().getTime();
    return `insert into user_info (\`email\`,\`github\`,\`createTime\`,\`updateTime\`,\`leave\`,\`name\`,\`avatar_url\`,\`passWord\`,\`type\`) value ("${email}","${github}","${time}","${time}","${leave}","${name}","${avatar_url}","","git")`
  },
  addImg(name, url, uid = 0) {
    let time = new Date().getTime();
    return `insert into user_img (\`fileName\`,\`url\`,\`time\`,\`uid\`) value ("${name}","${url}","${time}","${uid}")`
  },
  queryImgs(uid = 0) {
    return `select user_img.*,user_info.name as userName from user_img left join user_info on user_img.uid =user_info.id where \`uid\` = "${uid}"  order by \`time\` desc`;
  },
  queryApi(page, date, elapsed, size) {
    return `select * from request_info where \`request_time\` >= ${date} and \`request_elapsed\` >= ${elapsed}  ORDER BY \`request_time\` desc LIMIT ${page*size},${size}`;
  },
  queryApiTotal(page, date, elapsed) {
    return `select count(\`request_id\`) as total from request_info where \`request_time\` >= ${date} and \`request_elapsed\` >= ${elapsed}`;
  },
  saveVisitorInfo(ip,province,city,adcode,visit){
    return `insert into visitor_info ( \`ip\`, \`province\`, \`city\`, \`adcode\`,
         \`visit\`, \`time\` ) value ("${ip}", "${province}", "${city}", "${adcode}", "${visit}", "${new Date().getTime()}")`;
  },
  judgeVisitorInfo(ip,visit){
    return `SELECT * from visitor_info where ip = "${ip}"  and visit = "${visit}" and time > "${new Date().getTime() - 1000*60*30}"`
  }
}

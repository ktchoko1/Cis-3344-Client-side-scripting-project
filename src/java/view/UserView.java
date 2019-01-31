package view;

import dbUtils.DbConn;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.user.StringData;

public class UserView
{
  public UserView() {}
  
  public static StringData extractUser(ResultSet results)
  {
    StringData user = new StringData();
    try {
      user.userId = dbUtils.FormatUtils.formatInteger(results.getObject("user_id"));
      user.userMail = dbUtils.FormatUtils.formatString(results.getObject("user_mail"));
      user.userPass = dbUtils.FormatUtils.formatString(results.getObject("user_pass"));
      user.userName = dbUtils.FormatUtils.formatString(results.getObject("user_name"));
      user.userCredit = dbUtils.FormatUtils.formatInteger(results.getObject("credit"));
    } catch (Exception e) {
      user.errorMsg = ("Data Exception thrown in UserView.extractUser(): " + e.getMessage());
      System.out.println("*****" + user.errorMsg);
    }
    return user;
  }
  
  public static model.user.StringDataList buildUserList(DbConn dbc)
  {
    model.user.StringDataList userList = new model.user.StringDataList();
    
    userList.dbError = dbc.getErr();
    if (userList.dbError.length() == 0)
    {
      String sql = "SELECT user_id, user_name, user_mail, user_pass, credit FROM user ORDER BY user_name";
      
      try
      {
        PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
        ResultSet results = stmt.executeQuery();
        
        while (results.next()) {
          userList.add(extractUser(results));
        }
      } catch (Exception e) {
        userList.dbError = ("SQL Excepption thrown in UserView.BuildPersonList(): " + e.getMessage());
        System.out.println("*****" + userList.dbError);
      }
    }
    return userList;
  }
  
  public static StringData findUserById(DbConn dbc, String id)
  {
    StringData user = new StringData();
    
    if (id == null) {
      user.errorMsg = "Programmer error in UserView.findUserById(): null id.";
      return user;
    }
    
    user.errorMsg = dbc.getErr();
    if (user.errorMsg.length() == 0)
    {
      String sql = "SELECT user_id, user_name, user_pass, user_mail, credit FROM user WHERE user_id = ?";
      
      try
      {
        PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
        stmt.setString(1, id);
        ResultSet results = stmt.executeQuery();
        
        if (results.next()) {
          user = extractUser(results);
        }
      } catch (Exception e) {
        user.errorMsg = ("SQL Exception thrown in userView.FindPersonById(): " + e.getMessage());
        System.out.println("*****" + user.errorMsg);
      }
    }
    return user;
  }
  
  public static StringData findUserByLogon(DbConn dbc, String email, String pw)
  {
    StringData user = new StringData();
    
    if (email == null) {
      user.errorMsg = "Programmer error in UserView.findUserByLogon(): null email.";
      return user;
    }
    if (pw == null) {
      user.errorMsg = "Programmer error in PersonView.findUserByLogon(): null pw.";
      return user;
    }
    
    user.errorMsg = dbc.getErr();
    if (user.errorMsg.length() == 0)
    {
      String sql = "SELECT user_id, user_name, user_pass, user_mail, credit FROM user WHERE user_mail = ? AND user_pass = ?";
      
      try
      {
        PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
        stmt.setString(1, email);
        stmt.setString(2, pw);
        ResultSet results = stmt.executeQuery();
        
        if (results.next()) {
          user = extractUser(results);
        }
      } catch (Exception e) {
        user.errorMsg = ("SQL Exception thrown in UserView.findUserByLogon(): " + e.getMessage());
        System.out.println("*****" + user.errorMsg);
      }
    }
    return user;
  }
}
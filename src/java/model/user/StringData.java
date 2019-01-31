/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.user;

/**
 *
 * @author Kouassi
 */
public class StringData {
  public String userId = "";
  public String userName = "";
  public String userMail = "";
  public String userPass = "";
  public String userCredit = "";
  public String errorMsg = "";
  

  public StringData() {}
  

  public int getCharacterCount()
  {
    String s = userId + userMail + userName;
    return s.length();
  }
  
  public String toString() {
    return "userId:" + userId + ", email:" + userMail + ", nick:" + userName;
  }

    
}

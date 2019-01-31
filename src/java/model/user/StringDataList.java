/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.user;
import java.util.ArrayList;



/**
 *
 * @author Kouassi
 */
public class StringDataList {
    public String dbError = "";
  private ArrayList<StringData> userList = new ArrayList();
  

  public StringDataList() {}
  
  public void add(StringData stringData)
  {
    userList.add(stringData);
  }

    
}

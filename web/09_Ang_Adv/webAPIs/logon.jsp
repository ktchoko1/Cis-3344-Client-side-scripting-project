<%@page contentType="application/json" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.DbConn"%> 
<%@page language="java" import="view.UserView"%>
<%@page language="java" import="model.user.StringData"%>
<%@page language="java" import="com.google.gson.*" %>

<%
    /*  http://stackoverflow.com/questions/477816/what-is-the-correct-json-content-type 
     The MIME media type for JSON text is application/json. The default encoding is UTF-8. (Source: RFC 4627).
     */

    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    
    // When testing through URL tampering, must add something like this to end of JSP page name:
    //   ?userName=sallyk&pw=sk
    String uName = request.getParameter("email");
    String pass = request.getParameter("pw");

    //findPersonById will check if id is null or not...
    StringData user = UserView.findUserByLogon(dbc, uName, pass);
    
    if (user.errorMsg.length() == 0) { // means there was no database connection or SQL error
        
        if (user.userMail.length() == 0) { // means no db/sql error but person not found
            user.errorMsg = "Invalid username or password";
        } else { // means logon was good
            session.setAttribute("logon", user);
        }
    }
    
    // Valid logon would be represented by errorMsg = "" (empty string, length 0)
    out.print(gson.toJson(user).trim());

    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.
%>
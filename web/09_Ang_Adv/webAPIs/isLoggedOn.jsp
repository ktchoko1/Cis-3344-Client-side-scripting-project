<%@page contentType="application/json" pageEncoding="UTF-8"%> 

<%@page language="java" import="model.user.StringData"%>
<%@page language="java" import="com.google.gson.*" %>


<%
    StringData loggedOnUser = (StringData) session.getAttribute("logon");
    Gson gson = new Gson();
    out.print(gson.toJson(loggedOnUser).trim()); 

// if person logged on, the page out.prints the person record of the person who's logged on.
// else it prints "null"
%>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="SR2020.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/TokenScript.js"></script>
    <script src="Scripts/Test.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <div class="LoginBody">
                <div class="LoginContainer">

                    <div class="Login">
                        <input id="Uname" name="Uname" placeholder="Username" runat="server" />
                    </div>
                    <div class="Login">
                        <input id="Pword" name="Pword" placeholder="Password" type="password" runat="server" />
                    </div>
                    <%
                        for (int i = 0; i < 30; i++)
                        {
                            System.Diagnostics.Debug.WriteLine("Hellothere");
                        }


                        if (isloggedIn)
                        {
                            for (int i = 0; i < 30; i++)
                            {
                                System.Diagnostics.Debug.WriteLine("User is Authenticated");
                            }
                        }
                        else
                            Uname.Value = "Is not logged in";

                        %>
                    <div class="Login">
                        <asp:Button CssClass="nav-link" OnClick="ToSpa" ID="LoginButton" runat="server"></asp:Button>

                    </div>
                    <div class="HyperTextLogin">
                        <p><a href="#">Forgotten password?</a></p>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>

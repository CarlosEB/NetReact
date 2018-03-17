using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(NetReact.Startup))]
namespace NetReact
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

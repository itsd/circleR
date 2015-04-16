using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CircleR.Startup))]
namespace CircleR
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

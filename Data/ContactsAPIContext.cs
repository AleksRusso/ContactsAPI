using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Data
{
    public class ContactsAPIContext : DbContext
    {
        public ContactsAPIContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Contacts> Contacts { get; set; }
    }
}

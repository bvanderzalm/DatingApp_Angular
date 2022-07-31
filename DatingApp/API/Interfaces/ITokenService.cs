using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    // Contract between itself and any class that implements it
    // Any class that implements this interface will implement the interface's
    // properties, methods, and/or events.
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dob)
        {
            var today = DateTime.UtcNow;
            var age = today.Year - dob.Year;

            // If user hasn't had their birthday yet.
            if (dob.Date > today.AddYears(-age))
                age --;

            return age;
        }
    }
}
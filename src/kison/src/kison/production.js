/**
 * Production for KISON
 * @author yiminghe@gmail.com
 */
KISSY.add("kison/production", function (S, Base) {
   return Base.extend({

        equals: function (other) {
            var self = this;
            if (!S.equals(other.get("rhs"), self.get("rhs"))) {
                return false;
            }
            return other.get("symbol") == self.get("symbol");

        },

        toString: function (dot) {
            var rhsStr = "";
            var rhs = this.get("rhs");
            S.each(rhs, function (r, index) {
                if (index == dot) {
                    rhsStr += " . ";
                }
                rhsStr += r+' ';
            });
            if (dot == rhs.length) {
                rhsStr += " . ";
            }
            return this.get("symbol") + " => " + rhsStr;
        }

    }, {
        ATTRS: {
            firsts: {
                value: {}
            },
            follows: {
                value: []
            },
            symbol: {},
            rhs: {
                value: []
            },
            nullable: {
                value: false
            },
            action: {
                // action for this production
            }
        }
    });
}, {
    requires: ['base']
});
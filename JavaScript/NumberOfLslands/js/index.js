/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    var m = grid.length;
    if (m === 0) return 0;
    var n = grid[0].length;
    if (n === 0) return 0;
    var allOnes = new Map();
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (grid[i][j] == '1') allOnes.set(i * n + j, false);
        }
    }
    var count = 0;
    allOnes.forEach(function (value, key) {
        if (!value) {
            count++;
            bfs(key);
        }
    });
    return count;

    function bfs(key) {
        var stack = [];
        stack.push(key);
        while (stack.length > 0) {
            var seqNo = stack.pop();
            allOnes.set(seqNo, true);
            var iy = seqNo % n;
            var ix = Math.floor(seqNo / n);
            if (iy > 0) {
                var left = ix * n + iy - 1;
                if (grid[ix][iy - 1] == '1' && !allOnes.get(left)) stack.push(left);
            }
            if (iy < n-1) {
                var right = ix * n + iy + 1;
                if (grid[ix][iy + 1] == '1' && !allOnes.get(right)) stack.push(right);
            }
            if (ix > 0) {
                var up = (ix - 1) * n + iy;
                if (grid[ix - 1][iy] == '1' && !allOnes.get(up)) stack.push(up);
            }
            if (ix < m-1) {
                var down = (ix + 1) * n + iy;
                if (grid[ix + 1][iy] == '1' && !allOnes.get(down)) stack.push(down);
            }
        }
    }
};

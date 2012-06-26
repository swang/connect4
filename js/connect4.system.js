var connect4
if (!connect4) connect4 = {} 

connect4.system  = function() {
	
	var config = {
		rows: 6,
		cols: 7,
		numWinningDiscs: 4 // # of discs it takes to win
	}
	
	var disc = {
		empty: 0,
		red: 1,
		yellow: -1
	}
	
	function clearBoard() {
		board = new Array( config.rows )
		for (var r = 0; r < config.rows; r++ ) {
			board[r] = new Array(config.cols)
			for (var c = 0; c < config.cols; c++) {
				board[r][c] = disc.empty
			}
		}
	}
	function printBoard() {
		for (var r = 0; r < config.rows; r++ ) { 
		  var line = ""
			for (var c = 0; c < config.cols; c++) {
				if (board[r][c] != disc.empty)
					line += board[r][c] == disc.red ? "R":"C"
				else
					line += "."
			}
			console.log(line)
		}
	}
	function numCols() {
		return config.cols
	}
	function numRows()  {
		return config.rows
	}
	function placeDisc (player , column) {
		rows =  numRows()
		if (column > (numCols() - 1)) return -1
		for (var r = rows - 1 ; r >= 0; r--) {
			if (board[r][column] == disc.empty) {
				board[r][column] = player
				return r
			}
		}
		return -1
	}
	function findHorizontalWinner() {
		rows =  numRows()
		cols =  numCols()
		count = config.numWinningDiscs
		lastDisc = disc.empty
		for (var r = rows - 1 ; r >= 0; r--) {
			count = config.numWinningDiscs
			for (var c = 0; c < cols; c++) {
				if (lastDisc != disc.empty && lastDisc == board[r][c]) { 
					count--
					
				}
				else {
					count = config.numWinningDiscs
				}
				lastDisc = board[r][c]
				if (count == 1) return lastDisc
			}
		}
		return 0
	}
	function findVerticalWinner() {
		rows =  numRows()
		cols =  numCols()
		count = config.numWinningDiscs
		lastDisc = disc.empty
		for (var c = 0; c < cols; c++) {
			for (var r = rows - 1 ; r >= 0; r--) {
				if (lastDisc != disc.empty && lastDisc == board[r][c]) { 
					count--
				}
				else {
					count= config.numWinningDiscs
				}
				lastDisc = board[r][c]
				if (count == 1) return lastDisc
			}
		}
		return 0
	}
	function findDiagonalWinner() {
		rows =  numRows()
		cols =  numCols()
		count = config.numWinningDiscs
		if (rows < count || cols < count) return 0; // it is impossible to get 'count' discs in a diag line if the rows or columns are smaller than that number
		lastDisc = disc.empty
		for (var r = rows - 1 ; r >= count - 1; r--) {
			for (var c = 0; c < cols; c++) {
				currentDisc = board[r][c]
				if (c <= (cols - count) && currentDisc != disc.empty && currentDisc == board[r-1][c+1] && currentDisc == board[r-2][c+2] && currentDisc == board[r-3][c+3]) {
					return currentDisc
				}
				if (c >= (count - 1) && currentDisc != disc.empty && currentDisc == board[r-1][c-1] && currentDisc == board[r-2][c-2] && currentDisc == board[r-3][c-3]) {
					return currentDisc
				}
			}
			c++
		}
		return 0
		
	}

	function gameWon() {
		return findVerticalWinner() || findHorizontalWinner() || findDiagonalWinner()
	}
	clearBoard()
	
	return {
		numRows: function() {
			return numRows()
		},
		numCols: function() {
			return numCols()
		},
		placeDisc: function( player, column) {
			return placeDisc( player, column)
		},
		disc: function() {
			return disc
		},
		board: function() {
			return board
		},
		findVerticalWinner: function() {
			return findVerticalWinner()
		},
		findHorizontalWinner: function() {
			return findHorizontalWinner()
		},
		findDiagonalWinner: function() {
			return findDiagonalWinner()
		},
		clearBoard: function() {
			clearBoard()
		},
		printBoard: function() {
			printBoard()
		},
		gameWon: function() {
			return gameWon()
		}
		
	}
}


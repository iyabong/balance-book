import supabase from '../supabase';


// 모든 사용자 조회 (users 테이블에서)
export const getAllUsers = async() => {
    const {data, error} = await supabase
                                        .from('users')
                                        .select('*');
    if (error) {
        console.error('getAllUsers error:', error.message);
        throw error;
    }
    return data;
}

// 사용자별 잔액 계산 (대출 - 상환)
export const getBalanceByUser = async(userId) => {
    const {data, error} = await supabase
                                        .from("transactions")
                                        .select('type, amount')
                                        .eq('user_id', userId);
    if (error) {
        console.error('getBalanceByUser error:', error.message);
        throw error;
    }

    let loan = 0;
    let repayment = 0;

    data.forEach((tx) => {
        if (tx.type === 'loan') loan += Number(tx.amount);
        if (tx.type === 'repayment') repayment += Number(tx.amount);
    });

    return loan - repayment; 
}

export const getTransactionsByUser = async (userId) => {
    const {data, error} = await supabase
                                    .from('transactions')
                                    .select('*')
                                    .eq('user_id', userId)
                                    .order('created_at',{ascending:false});
    if (error) throw error;
    return data;
};